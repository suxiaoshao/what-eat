import { httpPost } from './main';

export interface PostUserfeedbackData {}

export async function postUserfeedback(userId: number, content: string): Promise<PostUserfeedbackData> {
  return await httpPost<PostUserfeedbackData, { userId: number; content: string }>('/user/feedback', {
    userId: userId,
    content: content,
  });
}
