
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useTRPC } from "@/trpc/client";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";

// export default function Home() {

//   const router = useRouter();
//   const [value, setValue] = useState("");
//   const trpc = useTRPC();

//   const createProject = useMutation(trpc.projects.create.mutationOptions({

//     onSuccess:(data) => {
//       router.push(`/projects/${data.id}`);
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     }
//   }))

//   return (
//     <div className="h-screen w-full flex items-center justify-center">
//       <div className="flex justify-center items-center flex-col max-w-7xl mx-auto p-7 gap-y-7">
//         <Input value={value} onChange={(e) => setValue(e.target.value)} />
//         <Button disabled={createProject.isPending} onClick={() => createProject.mutate({ value: value })}>
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// }


import ProjectForm from "@/modules/home/ui/components/project-form";
import { ProjectList } from "@/modules/home/ui/components/project-list";
import Image from "next/image";

export default function Page() {


  return (
    <div className="w-full flex flex-col max-w-5xl mx-auto">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image
            src="/logo/logo.svg"
            alt="Flow"
            width={50}
            height={50}
            className="hidden md:block"
          />
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          Build something with Flow
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Create apps and websites by chatting with AI
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
      <ProjectList />
    </div>
  );
}
