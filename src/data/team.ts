export interface TeamMember {
  id: string;
  fullName: string;
  title: string; // Confirm the operational role; never infer it from a register.
  group: "leadership" | "team";
  biography: string;
  imagePath?: string; // Public asset path. Missing/broken photos show initials.
  phone?: string;
  email?: string;
  linkedin?: string;
  approved: boolean; // Includes consent to publish the profile and contact data.
}

// Maintain every approved leadership and team profile in this one array.
// Leave unconfirmed names, roles, photos and contact information out.
// No actual staff profiles have been supplied yet.
export const teamMembers: TeamMember[] = [];
