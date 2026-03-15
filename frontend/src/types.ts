export interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: 'Complete' | 'Incomplete';
  user: string;
}

export interface TodoFormData {
  title: string;
  description: string;
  status: 'Complete' | 'Incomplete';
}
