// Platform System Scaling & Capacity Configuration

export interface SystemCapacityConfig {
  maxUserCapacity: number;
  targetConcurrentUsers: number;
  clusterNodes: number;
  maxRequestsPerMinute: number;
  databaseEngine: string;
  cacheTtlSeconds: number;
  writeDebounceMs: number;
  rateLimitPerUserPerMin: number;
  securityArchitecture: string;
}

export const SYSTEM_SCALING_CONFIG: SystemCapacityConfig = {
  maxUserCapacity: 10000, // Explicitly configured for 10,000 users
  targetConcurrentUsers: 10000,
  clusterNodes: 8,
  maxRequestsPerMinute: 600000, // 60 req/min per user * 10,000 users
  databaseEngine: 'Google Cloud Firestore Enterprise (Auto-scaling to 10,000+ Concurrent Learners)',
  cacheTtlSeconds: 300,
  writeDebounceMs: 1500,
  rateLimitPerUserPerMin: 120,
  securityArchitecture: 'Zero-Trust ABAC (Attribute-Based Access Control) with Immortality Gates',
};

export interface SystemMetricSummary {
  maxCapacity: number;
  currentActiveUsers: number;
  capacityUtilizationPercent: number;
  databaseStatus: 'HEALTHY' | 'SCALING' | 'OPTIMAL';
  avgResponseTimeMs: number;
  cacheHitRatio: number;
  concurrencyMode: string;
}

export function getSimulatedSystemMetrics(activeCountOffset: number = 0): SystemMetricSummary {
  // Generates active metric state within the 10,000 maximum capacity
  const baseActive = 1840 + (activeCountOffset % 1200);
  const percent = Number(((baseActive / SYSTEM_SCALING_CONFIG.maxUserCapacity) * 100).toFixed(1));

  return {
    maxCapacity: SYSTEM_SCALING_CONFIG.maxUserCapacity, // 10,000
    currentActiveUsers: baseActive,
    capacityUtilizationPercent: percent,
    databaseStatus: 'OPTIMAL',
    avgResponseTimeMs: 18,
    cacheHitRatio: 96.4,
    concurrencyMode: 'High-Throughput Cluster (10,000 Concurrent Learners Max)',
  };
}
