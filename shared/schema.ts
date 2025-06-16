import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  decimal,
  integer,
  boolean
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("donor").notNull(), // donor, admin, beneficiary
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  targetAmount: decimal("target_amount", { precision: 10, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 10, scale: 2 }).default("0").notNull(),
  status: varchar("status").default("active").notNull(), // active, completed, paused, cancelled
  category: varchar("category").notNull(), // food, medical, water, education, emergency
  location: text("location").notNull(),
  organizerId: varchar("organizer_id").references(() => users.id).notNull(),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Donations table
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  donorId: varchar("donor_id").references(() => users.id).notNull(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  transactionId: varchar("transaction_id").unique().notNull(),
  status: varchar("status").default("pending").notNull(), // pending, completed, failed, refunded
  isAnonymous: boolean("is_anonymous").default(false),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Transactions table for transparency tracking
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  transactionId: varchar("transaction_id").unique().notNull(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  type: varchar("type").notNull(), // donation, distribution, expense
  status: varchar("status").default("pending").notNull(), // pending, completed, verified, failed
  description: text("description").notNull(),
  recipientInfo: text("recipient_info"),
  verificationStatus: varchar("verification_status").default("pending").notNull(), // pending, verified, rejected
  blockchainHash: varchar("blockchain_hash"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Beneficiaries table
export const beneficiaries = pgTable("beneficiaries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contactInfo: text("contact_info"),
  location: text("location").notNull(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  verificationStatus: varchar("verification_status").default("pending").notNull(),
  biometricHash: varchar("biometric_hash"),
  receivedAmount: decimal("received_amount", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Activity log for tracking all actions
export const activityLog = pgTable("activity_log", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  action: varchar("action").notNull(),
  description: text("description").notNull(),
  entityType: varchar("entity_type"), // project, donation, transaction
  entityId: varchar("entity_id"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  organizedProjects: many(projects),
  donations: many(donations),
  activities: many(activityLog),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  organizer: one(users, {
    fields: [projects.organizerId],
    references: [users.id],
  }),
  donations: many(donations),
  transactions: many(transactions),
  beneficiaries: many(beneficiaries),
}));

export const donationsRelations = relations(donations, ({ one }) => ({
  donor: one(users, {
    fields: [donations.donorId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [donations.projectId],
    references: [projects.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  project: one(projects, {
    fields: [transactions.projectId],
    references: [projects.id],
  }),
}));

export const beneficiariesRelations = relations(beneficiaries, ({ one }) => ({
  project: one(projects, {
    fields: [beneficiaries.projectId],
    references: [projects.id],
  }),
}));

// Schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  currentAmount: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertBeneficiarySchema = createInsertSchema(beneficiaries).omit({
  id: true,
  receivedAmount: true,
  createdAt: true,
});

export const insertActivityLogSchema = createInsertSchema(activityLog).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Beneficiary = typeof beneficiaries.$inferSelect;
export type InsertBeneficiary = z.infer<typeof insertBeneficiarySchema>;
export type ActivityLog = typeof activityLog.$inferSelect;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
