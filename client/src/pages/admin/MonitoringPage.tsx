import React, { useEffect, useState } from 'react';
import { healthAggregator } from '../../telemetry/aggregators/healthAggregator';
import { HealthState } from '../../testing/models/HealthState';
import { performanceTracker, PerformanceMetric } from '../../performance/performanceTracker';
import { releaseService } from '../../release/services/releaseService';
import { ReleaseState } from '../../release/models/ReleaseState';
import { DeploymentState } from '../../release/models/DeploymentState';
import { environmentConfig } from '../../config/environment';

const MonitoringPage: React.FC = () => {
  const [healthStates, setHealthStates] = useState<HealthState[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [deploymentState, setDeploymentState] = useState<DeploymentState>('BOOTING');
  const [releaseState, setReleaseState] = useState<ReleaseState | null>(null);
  
  useEffect(() => {
    // Fetch telemetry data every 5 seconds
    const interval = window.setInterval(async () => {
      try {
        const states = await healthAggregator.aggregateHealth();
        setHealthStates(states);
        setMetrics(performanceTracker.getMetrics().slice(-10).reverse());
        setDeploymentState(releaseService.getDeploymentState());
        setReleaseState(releaseService.getReleaseState());
      } catch (e) {
        console.error('Failed to fetch telemetry', e);
      }
    }, 5000);
    
    // Initial fetch
    healthAggregator.aggregateHealth().then(setHealthStates);
    setMetrics(performanceTracker.getMetrics().slice(-10).reverse());
    setDeploymentState(releaseService.getDeploymentState());
    setReleaseState(releaseService.getReleaseState());
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#111827' }}>System Monitoring & Telemetry</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Release & Deployment Readiness Panel */}
        <div style={{
          padding: '1.5rem',
          borderRadius: '0.5rem',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          borderLeft: `4px solid ${deploymentState === 'READY' ? '#10b981' : deploymentState === 'DEGRADED' ? '#f59e0b' : '#ef4444'}`
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#374151' }}>Deployment Readiness</h3>
          <p style={{ margin: '0 0 1rem 0', fontWeight: 'bold', color: deploymentState === 'READY' ? '#10b981' : deploymentState === 'DEGRADED' ? '#f59e0b' : '#ef4444' }}>
            {deploymentState}
          </p>
          <div style={{ fontSize: '0.875rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div><strong>Environment:</strong> {environmentConfig.env}</div>
            <div><strong>Version:</strong> {environmentConfig.version}</div>
            {releaseState && <div><strong>Previous Ver:</strong> {releaseState.previousKnownVersion || 'None'}</div>}
            {releaseState && <div><strong>Rollback Ready:</strong> {releaseState.isRollbackEligible ? 'Yes' : 'No'}</div>}
          </div>
        </div>

        {healthStates.map(state => (
          <div key={state.subsystem} style={{
            padding: '1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            borderLeft: `4px solid ${state.status === 'HEALTHY' ? '#10b981' : state.status === 'DEGRADED' ? '#f59e0b' : '#ef4444'}`
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#374151' }}>{state.subsystem}</h3>
            <p style={{ margin: 0, fontWeight: 'bold', color: state.status === 'HEALTHY' ? '#10b981' : state.status === 'DEGRADED' ? '#f59e0b' : '#ef4444' }}>
              {state.status}
            </p>
            {state.latencyMs > 0 && <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>Avg Latency: {state.latencyMs.toFixed(2)}ms</p>}
            {state.errors && state.errors.length > 0 && (
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#ef4444' }}>Errors: {state.errors.length}</p>
            )}
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0', color: '#111827' }}>Recent Performance Metrics</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '0.75rem 0', color: '#6b7280' }}>Operation</th>
              <th style={{ padding: '0.75rem 0', color: '#6b7280' }}>Latency (ms)</th>
              <th style={{ padding: '0.75rem 0', color: '#6b7280' }}>Memory (MB)</th>
              <th style={{ padding: '0.75rem 0', color: '#6b7280' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {metrics.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '1rem 0', textAlign: 'center', color: '#9ca3af' }}>No recent metrics</td></tr>
            ) : (
              metrics.map((m, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 0', color: '#374151' }}>{m.operation}</td>
                  <td style={{ padding: '0.75rem 0', color: '#374151' }}>{m.latencyMs.toFixed(2)}</td>
                  <td style={{ padding: '0.75rem 0', color: '#374151' }}>{m.memoryUsageMB ? m.memoryUsageMB.toFixed(1) : '-'}</td>
                  <td style={{ padding: '0.75rem 0', color: '#6b7280', fontSize: '0.875rem' }}>{new Date(m.timestamp).toLocaleTimeString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonitoringPage;
