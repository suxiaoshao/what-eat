import { httpPost } from './main';

export interface PostUserFeedbackData {}

export async function postUserFeedback(userId: number, content: string): Promise<PostUserFeedbackData> {
  return await httpPost<PostUserFeedbackData, { userId: number; content: string }>('/user/feedback', {
    userId: userId,
    content: content,
  });
}
