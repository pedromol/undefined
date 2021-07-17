import * as cluster from 'cluster';
import * as os from 'os';
import { Injectable } from '@nestjs/common';
import StaticLogger from '../logger/logger.static';

@Injectable()
export class ClusterService {
  static createCluster(callback: { (): Promise<void>; (): void }): void {
    if ((cluster as unknown as cluster.Cluster).isMaster) {
      StaticLogger.getLogger().log(`Master server started on ${process.pid}`, 'ClusterService');

      for (let i = 0; i < os.cpus().length; i++) {
        (cluster as unknown as cluster.Cluster).fork();
      }

      (cluster as unknown as cluster.Cluster).on('exit', (worker: { process: { pid: number } }): void => {
        StaticLogger.getLogger().log(`Worker server ${worker.process.pid} died. Restarting`, 'ClusterService');
        (cluster as unknown as cluster.Cluster).fork();
      });
    } else {
      StaticLogger.getLogger().log(`Worker server started on ${process.pid}`, 'ClusterService');
      callback();
    }
  }
}
