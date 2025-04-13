import Image from "next/image";
import Link from "next/link";

import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="card-cta flex flex-col md:flex-row items-center justify-between gap-8 p-6">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-2xl md:text-3xl font-bold">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className="text-lg text-gray-300">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary w-full md:w-auto">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <div className="relative w-full md:w-auto">
          <Image
            src="/robot.png"
            alt="robo-dude"
            width={400}
            height={400}
            className="w-full max-w-[300px] md:max-w-[400px] mx-auto"
            priority
          />
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
