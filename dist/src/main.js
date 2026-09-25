"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Kanban Board API')
        .setDescription('API for managing users, lists and cards')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'Kanban Board API',
        customCss: `
      /* =========================================
         GENERAL PAGE
         ========================================= */

      html,
      body {
        min-height: 100%;
        background: #f3f6fb !important;
      }

      body {
        margin: 0 !important;
      }

      .swagger-ui {
        background: #f3f6fb !important;
        color: #172033 !important;

        font-family:
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          Roboto,
          Arial,
          sans-serif !important;
      }

      .swagger-ui .wrapper {
        max-width: 1280px !important;
        padding: 0 32px !important;
      }


      /* =========================================
         SWAGGER TOP BAR
         ========================================= */

      .swagger-ui .topbar {
        padding: 16px 0 !important;

        background:
          linear-gradient(
            120deg,
            #172554 0%,
            #312e81 50%,
            #4338ca 100%
          ) !important;

        border: none !important;

        box-shadow:
          0 8px 30px rgba(30, 41, 120, 0.22) !important;
      }


      /* =========================================
         API PRESENTATION
         ========================================= */

      .swagger-ui .information-container {
        background: transparent !important;
      }

      .swagger-ui .info {
        position: relative;

        margin: 38px 0 !important;

        padding: 42px 46px !important;

        background:
          linear-gradient(
            125deg,
            #1e3a8a 0%,
            #4338ca 55%,
            #6366f1 100%
          ) !important;

        border: none !important;

        border-radius: 24px !important;

        box-shadow:
          0 22px 55px rgba(67, 56, 202, 0.24) !important;

        overflow: hidden;
      }

      .swagger-ui .info::before {
        content: "KANBAN BOARD • REST API";

        display: inline-block;

        margin-bottom: 18px;

        padding: 7px 14px;

        color: #ffffff;

        background:
          rgba(255, 255, 255, 0.13);

        border:
          1px solid rgba(255, 255, 255, 0.20);

        border-radius: 999px;

        font-size: 11px;

        font-weight: 800;

        letter-spacing: 1.4px;
      }

      .swagger-ui .info::after {
        content: "";

        position: absolute;

        width: 300px;
        height: 300px;

        right: -120px;
        top: -150px;

        background:
          rgba(255, 255, 255, 0.10);

        border-radius: 50%;
      }

      .swagger-ui .info .title {
        position: relative;

        z-index: 2;

        color: #ffffff !important;

        font-size: 42px !important;

        font-weight: 800 !important;

        letter-spacing: -1.3px !important;

        margin-bottom: 14px !important;
      }

      .swagger-ui .info .title small {
        background:
          rgba(255, 255, 255, 0.15) !important;

        border-radius: 8px !important;
      }

      .swagger-ui .info .title small pre {
        color: #ffffff !important;
      }

      .swagger-ui .info p,
      .swagger-ui .info li,
      .swagger-ui .info a {
        position: relative;

        z-index: 2;

        color: #e0e7ff !important;

        font-size: 15px !important;
      }


      /* =========================================
         AUTHORIZE AREA
         ========================================= */

      .swagger-ui .scheme-container {
        margin: 0 0 40px !important;

        padding: 22px 26px !important;

        background: #ffffff !important;

        border:
          1px solid #e2e8f0 !important;

        border-radius: 16px !important;

        box-shadow:
          0 10px 30px rgba(15, 23, 42, 0.07) !important;
      }

      .swagger-ui .btn.authorize {
        padding: 11px 20px !important;

        color: #ffffff !important;

        background:
          linear-gradient(
            135deg,
            #4f46e5,
            #6366f1
          ) !important;

        border: none !important;

        border-radius: 10px !important;

        font-weight: 700 !important;

        box-shadow:
          0 8px 20px rgba(79, 70, 229, 0.24) !important;

        transition: 0.2s ease !important;
      }

      .swagger-ui .btn.authorize:hover {
        transform: translateY(-2px);
      }

      .swagger-ui .btn.authorize svg {
        fill: #ffffff !important;
      }


      /* =========================================
         USERS / AUTHENTICATION / LISTS / CARDS
         ========================================= */

      .swagger-ui .opblock-tag-section {
        margin-bottom: 32px !important;
      }

      .swagger-ui .opblock-tag {
        margin: 0 0 14px !important;

        padding: 18px 22px !important;

        color: #172033 !important;

        background: #ffffff !important;

        border:
          1px solid #e2e8f0 !important;

        border-radius: 14px !important;

        font-size: 21px !important;

        font-weight: 750 !important;

        box-shadow:
          0 5px 18px rgba(15, 23, 42, 0.06) !important;
      }


      /* =========================================
         ENDPOINT CARDS
         ========================================= */

      .swagger-ui .opblock {
        margin: 12px 0 !important;

        overflow: hidden !important;

        border-radius: 14px !important;

        box-shadow:
          0 7px 20px rgba(15, 23, 42, 0.07) !important;

        transition:
          transform 0.18s ease,
          box-shadow 0.18s ease !important;
      }

      .swagger-ui .opblock:hover {
        transform: translateY(-2px);

        box-shadow:
          0 14px 32px rgba(15, 23, 42, 0.12) !important;
      }

      .swagger-ui .opblock .opblock-summary {
        min-height: 64px !important;

        padding: 8px 18px !important;
      }


      /* =========================================
         GET
         ========================================= */

      .swagger-ui .opblock.opblock-get {
        background:
          linear-gradient(
            90deg,
            #eff6ff 0%,
            #ffffff 70%
          ) !important;

        border:
          1px solid #bfdbfe !important;
      }


      /* =========================================
         POST
         ========================================= */

      .swagger-ui .opblock.opblock-post {
        background:
          linear-gradient(
            90deg,
            #ecfdf5 0%,
            #ffffff 70%
          ) !important;

        border:
          1px solid #a7f3d0 !important;
      }


      /* =========================================
         PATCH
         ========================================= */

      .swagger-ui .opblock.opblock-patch {
        background:
          linear-gradient(
            90deg,
            #ecfeff 0%,
            #ffffff 70%
          ) !important;

        border:
          1px solid #a5f3fc !important;
      }


      /* =========================================
         DELETE
         ========================================= */

      .swagger-ui .opblock.opblock-delete {
        background:
          linear-gradient(
            90deg,
            #fff1f2 0%,
            #ffffff 70%
          ) !important;

        border:
          1px solid #fecdd3 !important;
      }


      /* =========================================
         HTTP METHOD BADGES
         ========================================= */

      .swagger-ui .opblock-summary-method {
        min-width: 82px !important;

        padding: 9px 12px !important;

        border-radius: 9px !important;

        font-size: 12px !important;

        font-weight: 800 !important;

        letter-spacing: 0.5px !important;

        box-shadow:
          0 4px 10px rgba(15, 23, 42, 0.12) !important;

        text-shadow: none !important;
      }


      /* =========================================
         ROUTE TEXT
         ========================================= */

      .swagger-ui .opblock-summary-path {
        color: #172033 !important;

        font-size: 15px !important;

        font-weight: 750 !important;
      }

      .swagger-ui .opblock-summary-description {
        color: #64748b !important;

        font-size: 13px !important;
      }


      /* =========================================
         OPENED ENDPOINT
         ========================================= */

      .swagger-ui .opblock-body {
        padding: 22px !important;

        background: #ffffff !important;

        border-top:
          1px solid #e2e8f0 !important;
      }


      /* =========================================
         GENERAL TEXT
         ========================================= */

      .swagger-ui p,
      .swagger-ui label,
      .swagger-ui table,
      .swagger-ui .parameter__name,
      .swagger-ui .parameter__type,
      .swagger-ui .response-col_status,
      .swagger-ui .response-col_description {
        color: #334155 !important;
      }

      .swagger-ui h1,
      .swagger-ui h2,
      .swagger-ui h3,
      .swagger-ui h4,
      .swagger-ui h5 {
        color: #172033;
      }


      /* =========================================
         INPUTS
         ========================================= */

      .swagger-ui input,
      .swagger-ui textarea,
      .swagger-ui select {
        padding: 10px !important;

        color: #0f172a !important;

        background: #f8fafc !important;

        border:
          1px solid #cbd5e1 !important;

        border-radius: 9px !important;

        outline: none !important;
      }

      .swagger-ui input:focus,
      .swagger-ui textarea:focus,
      .swagger-ui select:focus {
        border-color: #6366f1 !important;

        box-shadow:
          0 0 0 3px rgba(99, 102, 241, 0.12) !important;
      }


      /* =========================================
         BUTTONS
         ========================================= */

      .swagger-ui .btn {
        border-radius: 9px !important;

        font-weight: 700 !important;

        transition:
          transform 0.15s ease !important;
      }

      .swagger-ui .btn:hover {
        transform: translateY(-1px);
      }

      .swagger-ui .btn.execute {
        color: #ffffff !important;

        background:
          linear-gradient(
            135deg,
            #4f46e5,
            #6366f1
          ) !important;

        border: none !important;

        box-shadow:
          0 8px 20px rgba(79, 70, 229, 0.22) !important;
      }


      /* =========================================
         RESPONSE / JSON
         ========================================= */

      .swagger-ui .responses-inner {
        background: #ffffff !important;

        border-radius: 12px !important;
      }

      .swagger-ui pre,
      .swagger-ui .microlight,
      .swagger-ui .highlight-code {
        color: #e5e7eb !important;

        background: #111827 !important;

        border-radius: 11px !important;
      }


      /* =========================================
         SCHEMAS
         ========================================= */

      .swagger-ui section.models {
        margin: 42px 0 55px !important;

        padding: 12px !important;

        background: #ffffff !important;

        border:
          1px solid #e2e8f0 !important;

        border-radius: 16px !important;

        box-shadow:
          0 10px 30px rgba(15, 23, 42, 0.07) !important;
      }

      .swagger-ui section.models h4 {
        color: #172033 !important;

        font-weight: 750 !important;
      }

      .swagger-ui .model-container {
        margin: 9px !important;

        background: #f8fafc !important;

        border:
          1px solid #e2e8f0 !important;

        border-radius: 10px !important;
      }


      /* =========================================
         AUTHORIZE POPUP
         ========================================= */

      .swagger-ui .dialog-ux .backdrop-ux {
        background:
          rgba(15, 23, 42, 0.65) !important;

        backdrop-filter: blur(4px);
      }

      .swagger-ui .dialog-ux .modal-ux {
        background: #ffffff !important;

        border: none !important;

        border-radius: 18px !important;

        box-shadow:
          0 25px 70px rgba(15, 23, 42, 0.30) !important;
      }

      .swagger-ui .dialog-ux .modal-ux-header {
        border-bottom:
          1px solid #e2e8f0 !important;
      }

      .swagger-ui .dialog-ux .modal-ux-header h3 {
        color: #172033 !important;
      }


      /* =========================================
         SCROLLBAR
         ========================================= */

      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        background: #eef2f7;
      }

      ::-webkit-scrollbar-thumb {
        background: #a5b4fc;

        border-radius: 20px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #818cf8;
      }
    `,
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map