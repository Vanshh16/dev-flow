import ProjectView from "@/modules/projects/ui/views/project-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

interface ProjectPageProps {
    params: Promise<{ projectId: string }>
}

const Page = async ({ params }: ProjectPageProps) => {

    const { projectId } = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.messages.getMany.queryOptions({
        projectId
    }));
    void queryClient.prefetchQuery(trpc.projects.getOne.queryOptions({
        id: projectId
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ErrorBoundary fallback={<p>Error!</p>}>
                <Suspense fallback={<div>Loading...</div>}>
                    <ProjectView projectId={projectId} />
                </Suspense>
            </ErrorBoundary>
        </HydrationBoundary>
    )
}

export default Page;