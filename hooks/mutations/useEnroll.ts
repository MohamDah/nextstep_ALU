import { ApiResponse } from "@/lib/api/utils";
import api from "@/lib/axios";
import { Enrollment } from "@/models/Enrollment";
import { useMutation } from "@tanstack/react-query";

const enroll = async ({ courseId }: { courseId: string }) => {
  const { data } = await api.post<ApiResponse<Enrollment>>(`/api/courses/${courseId}/enroll`);
  return data.data
}

export function useEnrollMutation() {
  return useMutation({
    mutationFn: enroll
  })
}