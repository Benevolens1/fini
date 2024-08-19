import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CredentialsService } from "./credentials/credentials.service";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const credentialService = app.get(CredentialsService);
    await credentialService.signUp('admin','password');
    await app.close();
}
bootstrap();
