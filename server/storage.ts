import {
  users,
  projects,
  donations,
  transactions,
  beneficiaries,
  activityLog,
  type User,
  type UpsertUser,
  type Project,
  type InsertProject,
  type Donation,
  type InsertDonation,
  type Transaction,
  type InsertTransaction,
  type Beneficiary,
  type InsertBeneficiary,
  type ActivityLog,
  type InsertActivityLog,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sum, count, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Donation operations
  getDonations(): Promise<Donation[]>;
  getDonationsByUser(userId: string): Promise<Donation[]>;
  getDonationsByProject(projectId: number): Promise<Donation[]>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  updateDonationStatus(id: number, status: string): Promise<Donation | undefined>;
  
  // Transaction operations
  getTransactions(): Promise<Transaction[]>;
  getTransactionsByProject(projectId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransactionStatus(id: number, status: string, verificationStatus?: string): Promise<Transaction | undefined>;
  
  // Beneficiary operations
  getBeneficiaries(): Promise<Beneficiary[]>;
  getBeneficiariesByProject(projectId: number): Promise<Beneficiary[]>;
  createBeneficiary(beneficiary: InsertBeneficiary): Promise<Beneficiary>;
  
  // Activity log operations
  getRecentActivity(limit?: number): Promise<ActivityLog[]>;
  getUserActivity(userId: string, limit?: number): Promise<ActivityLog[]>;
  logActivity(activity: InsertActivityLog): Promise<ActivityLog>;
  
  // Analytics operations
  getDashboardStats(): Promise<{
    totalDonated: number;
    activeProjects: number;
    peopleHelped: number;
    transparencyScore: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return result.rowCount > 0;
  }

  // Donation operations
  async getDonations(): Promise<Donation[]> {
    return await db.select().from(donations).orderBy(desc(donations.createdAt));
  }

  async getDonationsByUser(userId: string): Promise<Donation[]> {
    return await db
      .select()
      .from(donations)
      .where(eq(donations.donorId, userId))
      .orderBy(desc(donations.createdAt));
  }

  async getDonationsByProject(projectId: number): Promise<Donation[]> {
    return await db
      .select()
      .from(donations)
      .where(eq(donations.projectId, projectId))
      .orderBy(desc(donations.createdAt));
  }

  async createDonation(donation: InsertDonation): Promise<Donation> {
    const [newDonation] = await db.insert(donations).values(donation).returning();
    
    // Update project current amount
    await db
      .update(projects)
      .set({
        currentAmount: sql`current_amount + ${donation.amount}`,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, donation.projectId));
    
    return newDonation;
  }

  async updateDonationStatus(id: number, status: string): Promise<Donation | undefined> {
    const [updatedDonation] = await db
      .update(donations)
      .set({ status })
      .where(eq(donations.id, id))
      .returning();
    return updatedDonation;
  }

  // Transaction operations
  async getTransactions(): Promise<Transaction[]> {
    return await db.select().from(transactions).orderBy(desc(transactions.createdAt));
  }

  async getTransactionsByProject(projectId: number): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.projectId, projectId))
      .orderBy(desc(transactions.createdAt));
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [newTransaction] = await db.insert(transactions).values(transaction).returning();
    return newTransaction;
  }

  async updateTransactionStatus(
    id: number,
    status: string,
    verificationStatus?: string
  ): Promise<Transaction | undefined> {
    const updates: any = { status };
    if (verificationStatus) {
      updates.verificationStatus = verificationStatus;
    }
    
    const [updatedTransaction] = await db
      .update(transactions)
      .set(updates)
      .where(eq(transactions.id, id))
      .returning();
    return updatedTransaction;
  }

  // Beneficiary operations
  async getBeneficiaries(): Promise<Beneficiary[]> {
    return await db.select().from(beneficiaries).orderBy(desc(beneficiaries.createdAt));
  }

  async getBeneficiariesByProject(projectId: number): Promise<Beneficiary[]> {
    return await db
      .select()
      .from(beneficiaries)
      .where(eq(beneficiaries.projectId, projectId))
      .orderBy(desc(beneficiaries.createdAt));
  }

  async createBeneficiary(beneficiary: InsertBeneficiary): Promise<Beneficiary> {
    const [newBeneficiary] = await db.insert(beneficiaries).values(beneficiary).returning();
    return newBeneficiary;
  }

  // Activity log operations
  async getRecentActivity(limit: number = 10): Promise<ActivityLog[]> {
    return await db
      .select()
      .from(activityLog)
      .orderBy(desc(activityLog.createdAt))
      .limit(limit);
  }

  async getUserActivity(userId: string, limit: number = 10): Promise<ActivityLog[]> {
    return await db
      .select()
      .from(activityLog)
      .where(eq(activityLog.userId, userId))
      .orderBy(desc(activityLog.createdAt))
      .limit(limit);
  }

  async logActivity(activity: InsertActivityLog): Promise<ActivityLog> {
    const [newActivity] = await db.insert(activityLog).values(activity).returning();
    return newActivity;
  }

  // Analytics operations
  async getDashboardStats(): Promise<{
    totalDonated: number;
    activeProjects: number;
    peopleHelped: number;
    transparencyScore: number;
  }> {
    // Get total donated amount
    const [totalDonatedResult] = await db
      .select({ total: sum(donations.amount) })
      .from(donations)
      .where(eq(donations.status, "completed"));

    // Get active projects count
    const [activeProjectsResult] = await db
      .select({ count: count() })
      .from(projects)
      .where(eq(projects.status, "active"));

    // Get total people helped (beneficiaries)
    const [peopleHelpedResult] = await db
      .select({ count: count() })
      .from(beneficiaries);

    // Calculate transparency score based on verified transactions
    const [verifiedTransactions] = await db
      .select({ count: count() })
      .from(transactions)
      .where(eq(transactions.verificationStatus, "verified"));

    const [totalTransactions] = await db
      .select({ count: count() })
      .from(transactions);

    const transparencyScore = totalTransactions.count > 0 
      ? (verifiedTransactions.count / totalTransactions.count) * 100 
      : 100;

    return {
      totalDonated: Number(totalDonatedResult.total) || 0,
      activeProjects: activeProjectsResult.count,
      peopleHelped: peopleHelpedResult.count,
      transparencyScore: Math.round(transparencyScore * 10) / 10,
    };
  }
}

export const storage = new DatabaseStorage();
