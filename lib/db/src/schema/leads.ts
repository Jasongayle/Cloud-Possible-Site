import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  clientType: text("client_type").notNull(),
  companyName: text("company_name"),
  numEmployees: integer("num_employees"),
  currentSetup: text("current_setup"),
  deviceType: text("device_type"),
  issueType: text("issue_type"),
  mainProblem: text("main_problem"),
  description: text("description"),
  urgency: text("urgency").notNull(),
  consent: text("consent").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leadsTable).omit({ id: true, createdAt: true });
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leadsTable.$inferSelect;
