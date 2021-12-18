import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as NativeCluster from 'cluster';
import { Logger } from 'nestjs-pino';
import * as os from 'os';

@Injectable()
export class ClusterService {
  constructor(private configService: ConfigService, private logger: Logger) {}

  private cluster: NativeCluster.Cluster = NativeCluster as unknown as NativeCluster.Cluster;

  start(callback): void {
    if (this.configService.get('CLUSTER_ENABLED')?.toLowerCase() === 'true') {
      if (this.cluster.isPrimary) {
        this.logger.log(`Master server started on ${process.pid}`, 'ClusterService');

        for (let i = 0; i < os.cpus().length; i++) {
          this.cluster.fork();
        }

        this.cluster.on('exit', (worker: { process: { pid: number } }): void => {
          this.logger.log(`Worker server ${worker.process.pid} died. Restarting`, 'ClusterService');
          this.cluster.fork();
        });
      } else {
        this.logger.log(`Worker server started on ${process.pid}`, 'ClusterService');
        callback();
      }
    } else {
      this.logger.log(`Single server started on ${process.pid}`, 'ClusterService');
      callback();
    }
  }
}
