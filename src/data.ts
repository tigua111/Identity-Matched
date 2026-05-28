/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExamineeRecord } from "./types";

export const mockRecords: ExamineeRecord[] = [
  {
    id: "20261001",
    identityCard: "A123456789",
    name: "James Miller",
    department: "Music Production and Engineering (M.M.)",
    category: "Global Early Decision",
    status: "APPROVED",
    decisionText: "Upon comprehensive evaluation by the Admissions Board of Berklee College of Music, the candidate has demonstrated remarkable creative vision, exceptional music-technical proficiency, and outstanding modern arrangement skills. We are extremely pleased to confirm your admission as an active incoming student.",
    registrationDate: "2026-05-20",
    totalScore: 92.85,
    rank: "1 / 45",
    subjects: [
      { name: "Portfolio & Creative Review", score: 95.0, weight: 0.4, weightedScore: 38.0, grade: "A+" },
      { name: "Audition & Performance", score: 91.0, weight: 0.4, weightedScore: 36.4, grade: "A" },
      { name: "Principal Instrument Interview", score: 92.25, weight: 0.2, weightedScore: 18.45, grade: "A+" }
    ]
  },
  {
    id: "20261002",
    identityCard: "F234567890",
    name: "Sofia Rodriguez",
    department: "Contemporary Performance (Global Jazz Concentration)",
    category: "Regular Audition Round",
    status: "APPROVED",
    decisionText: "Following a detailed evaluation of your live audition portfolio and academic interview, the Audition Board of Berklee College of Music unanimously concurs that your advanced improvisational ability and stylistic mastery meet our rigorous criteria. We look forward to your collegiate tenure at Berklee.",
    registrationDate: "2026-05-22",
    totalScore: 89.40,
    rank: "3 / 68",
    subjects: [
      { name: "Portfolio & Creative Review", score: 88.5, weight: 0.5, weightedScore: 44.25, grade: "A" },
      { name: "Audition & Performance", score: 90.3, weight: 0.5, weightedScore: 45.15, grade: "A" }
    ]
  }
];

export const generateCustomApprovedRecord = (id: string, name: string): ExamineeRecord => {
  const finalId = id.trim() || "20268888";
  const finalName = name.trim() || "Selected Candidate";
  
  return {
    id: finalId,
    identityCard: "L******456",
    name: finalName,
    department: "Film Scoring and Orchestration (M.A.)",
    category: "Presidential Merit Assessment",
    status: "APPROVED",
    decisionText: "After rigorous portfolio analysis and technical interview, the Berklee College of Music Admissions Board has officially verified your creative voice, advanced orchestrational competence, and stylistic diversity. The board has declared you 'REVIEW APPROVED' with high distinctions.",
    registrationDate: "2026-05-28",
    totalScore: 95.50,
    rank: "Honorable Merit",
    subjects: [
      { name: "Cinematic Portfolio Evaluation", score: 96.0, weight: 0.5, weightedScore: 48.0, grade: "A+" },
      { name: "Creative Composition Interview", score: 95.0, weight: 0.5, weightedScore: 47.5, grade: "A+" }
    ]
  };
};
