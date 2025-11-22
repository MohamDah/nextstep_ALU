import { ApiResponse } from "@/lib/api/utils";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Enrollment } from "../useEnrollments";

const enroll = async ({ courseId }: { courseId: string }) => {
  const { data } = await api.post<ApiResponse<Enrollment>>(`/api/courses/${courseId}/enroll`);
  return data.data
}

export function useEnrollMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enroll,
    onSuccess: () => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["course"] }),
        queryClient.invalidateQueries({ queryKey: ["enrollments"] }),
        queryClient.invalidateQueries({ queryKey: ['courses'] }),
      ])
    },
  });
}