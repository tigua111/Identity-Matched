/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GradeSubject {
  name: string;
  score: number;
  weight: number;
  weightedScore: number;
  grade: string;
}

export interface ExamineeRecord {
  id: string; // 准考證號
  identityCard: string; // 身分證字號
  name: string; // 姓名
  department: string; // 報考系所
  category: string; // 招生類別
  status: "APPROVED" | "PENDING" | "REJECTED"; // 審查狀態
  decisionText: string; // 委員會審定意見
  registrationDate: string; // 登記日期
  subjects: GradeSubject[];
  totalScore: number;
  rank: string;
}
