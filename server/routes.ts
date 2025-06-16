import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertProjectSchema, 
  insertDonationSchema,
  insertTransactionSchema,
  insertBeneficiarySchema,
  insertActivityLogSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Dashboard stats
  app.get('/api/dashboard/stats', isAuthenticated, async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Projects routes
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get('/api/projects/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const projectData = insertProjectSchema.parse({
        ...req.body,
        organizerId: req.user.claims.sub,
      });
      
      const project = await storage.createProject(projectData);
      
      // Log activity
      await storage.logActivity({
        userId: req.user.claims.sub,
        action: "create_project",
        description: `Created new project: ${project.title}`,
        entityType: "project",
        entityId: project.id.toString(),
      });
      
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Donations routes
  app.get('/api/donations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const donations = await storage.getDonationsByUser(userId);
      res.json(donations);
    } catch (error) {
      console.error("Error fetching donations:", error);
      res.status(500).json({ message: "Failed to fetch donations" });
    }
  });

  app.post('/api/donations', isAuthenticated, async (req: any, res) => {
    try {
      const donationData = insertDonationSchema.parse({
        ...req.body,
        donorId: req.user.claims.sub,
        transactionId: `HUM-TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      });
      
      const donation = await storage.createDonation(donationData);
      
      // Create corresponding transaction
      await storage.createTransaction({
        transactionId: donation.transactionId,
        projectId: donation.projectId,
        amount: donation.amount,
        type: "donation",
        status: "completed",
        description: `Donation from ${req.user.claims.email || 'Anonymous'}`,
        verificationStatus: "verified",
      });
      
      // Log activity
      await storage.logActivity({
        userId: req.user.claims.sub,
        action: "make_donation",
        description: `Donated $${donation.amount} to project`,
        entityType: "donation",
        entityId: donation.id.toString(),
      });
      
      res.status(201).json(donation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid donation data", errors: error.errors });
      }
      console.error("Error creating donation:", error);
      res.status(500).json({ message: "Failed to process donation" });
    }
  });

  // Transactions routes
  app.get('/api/transactions', async (req, res) => {
    try {
      const transactions = await storage.getTransactions();
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.get('/api/projects/:projectId/transactions', async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const transactions = await storage.getTransactionsByProject(projectId);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching project transactions:", error);
      res.status(500).json({ message: "Failed to fetch project transactions" });
    }
  });

  // Beneficiaries routes
  app.get('/api/beneficiaries', isAuthenticated, async (req, res) => {
    try {
      const beneficiaries = await storage.getBeneficiaries();
      res.json(beneficiaries);
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
      res.status(500).json({ message: "Failed to fetch beneficiaries" });
    }
  });

  app.post('/api/beneficiaries', isAuthenticated, async (req: any, res) => {
    try {
      const beneficiaryData = insertBeneficiarySchema.parse(req.body);
      const beneficiary = await storage.createBeneficiary(beneficiaryData);
      
      // Log activity
      await storage.logActivity({
        userId: req.user.claims.sub,
        action: "register_beneficiary",
        description: `Registered new beneficiary: ${beneficiary.name}`,
        entityType: "beneficiary",
        entityId: beneficiary.id.toString(),
      });
      
      res.status(201).json(beneficiary);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid beneficiary data", errors: error.errors });
      }
      console.error("Error creating beneficiary:", error);
      res.status(500).json({ message: "Failed to register beneficiary" });
    }
  });

  // Activity routes
  app.get('/api/activity/recent', isAuthenticated, async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getRecentActivity(limit);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      res.status(500).json({ message: "Failed to fetch recent activity" });
    }
  });

  app.get('/api/activity/my', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getUserActivity(userId, limit);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching user activity:", error);
      res.status(500).json({ message: "Failed to fetch user activity" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
