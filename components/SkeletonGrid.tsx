import React from 'react'

export default function SkeletonGrid({ count = 8 }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
            <div className="h-48 bg-slate-200"></div>
            <div className="p-5">
              <div className="h-5 bg-slate-200 rounded-lg w-3/4 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }