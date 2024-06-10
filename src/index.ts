import { Server, envs } from "./config";
import { AppRoutes } from "./routes";

(async()=> {
    main();
})();
  
  
async function main() {
    const server = new Server({
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: AppRoutes.routes,
    });
  
    server.start();
  }

