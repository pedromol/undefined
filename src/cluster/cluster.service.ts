import * as NativeCluster from 'cluster';
import * as os from 'os';
import StaticLogger from 'src/logger/logger.static';

export class ClusterService {
  private static cluster: NativeCluster.Cluster = NativeCluster as unknown as NativeCluster.Cluster;
  static createCluster(callback: { (): Promise<void>; (): void }): void {
    if (ClusterService.cluster.isMaster) {
      StaticLogger.getLogger().log(`Master server started on ${process.pid}`, 'ClusterService');

      for (let i = 0; i < os.cpus().length; i++) {
        ClusterService.cluster.fork();
      }

      ClusterService.cluster.on('exit', (worker: { process: { pid: number } }): void => {
        StaticLogger.getLogger().log(`Worker server ${worker.process.pid} died. Restarting`, 'ClusterService');
        ClusterService.cluster.fork();
      });
    } else {
      StaticLogger.getLogger().log(`Worker server started on ${process.pid}`, 'ClusterService');
      callback();
    }
  }
}
