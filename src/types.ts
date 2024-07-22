"use strict";

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  last_name: string;
  balance: number;
  percent: number;
  middle_name: string | null;
  role: UserRole;
}

export interface UserRole {
  id: number;
  name: string;
  description: string;
  type: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  owner: User;
  contractor: User;
  createdAt: string;
  updatedAt: string;
  status: string;
  logo: {
    url: string;
    width: number;
    height: number;
  };
  groups: Group[];
}

export interface Group {
  currency: string;
  hourly_rate: number;
  id: number;
  title: string;
  tasks: Task[];
  project: Project;
}

export interface Task {
  key: number;
  id: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
  spent_time: number;
  createdAt: string;
  updatedAt: string;
  group: Group;
  comments: Comment[] | number;
}

export interface Comment {
  id: number;
  text: string;
  task: Task;
  createdAt: string;
  updatedAt: string;
}
