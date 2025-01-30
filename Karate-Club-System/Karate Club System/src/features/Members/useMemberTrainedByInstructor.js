import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllMembersTrainedByInstructorID } from "../../services/apiMembers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_FOR_HISTORY } from "../../utils/constants";

export function useMemberTrainedByInstructor(InstructorID) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page2")) || 1;

  const {
    isLoading,
    data: { members, count } = {},
    error,
  } = useQuery({
    queryKey: ["membersTraiend", InstructorID, page, PAGE_SIZE_FOR_HISTORY],
    queryFn: () =>
      getAllMembersTrainedByInstructorID(
        InstructorID,
        page,
        PAGE_SIZE_FOR_HISTORY
      ),
    retry: 2,
  });
  const pageCount = Math.ceil(count / PAGE_SIZE_FOR_HISTORY);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["membersTraiend", page + 1, PAGE_SIZE_FOR_HISTORY],
      queryFn: () =>
        getAllMembersTrainedByInstructorID(
          InstructorID,
          page,
          PAGE_SIZE_FOR_HISTORY
        ),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["membersTraiend", page - 1, PAGE_SIZE_FOR_HISTORY],
      queryFn: () =>
        getAllMembersTrainedByInstructorID(
          InstructorID,
          page,
          PAGE_SIZE_FOR_HISTORY
        ),
    });

  return { isLoading, error, members, count };
}
