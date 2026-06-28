import React from "react";
import Navbar from "./Navbar";

const SkeletonCard = () => (
  <div className="h-24 animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between">
      <div className="h-6 w-20 rounded-full bg-gray-200"></div>
      <div className="h-6 w-6 rounded-md bg-gray-200"></div>
    </div>
    <div className="mt-4 h-5 w-3/4 rounded-full bg-gray-200"></div>
  </div>
);

const SkeletonList = () => (
  <div className="rounded-xl border border-gray-200 bg-gray-50/50">
    <div className="flex items-center justify-between border-b p-5">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-gray-200"></div>
        <div className="h-6 w-28 rounded-full bg-gray-200"></div>
        <div className="h-6 w-8 rounded-full bg-gray-100"></div>
      </div>
    </div>
    <div className="space-y-4 p-4">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
);

const DashboardSkeleton = ({ isInitialLoad = false }) => {
  const StatsAndTasksSkeleton = () => (
    <>
      <div className="mb-8 h-24 w-full animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm"></div>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        <SkeletonList />
        <SkeletonList />
        <SkeletonList />
      </div>
    </>
  );

  if (isInitialLoad) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <section className="mx-auto max-w-7xl px-4 py-6">
          <div className="mb-6 h-[120px] w-full animate-pulse rounded-2xl border border-gray-200 bg-white p-4 md:p-6"></div>
          <StatsAndTasksSkeleton />
        </section>
      </div>
    );
  }

  return (
    <>
      <StatsAndTasksSkeleton />
    </>
  );
};

export default DashboardSkeleton;