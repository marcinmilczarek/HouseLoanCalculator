using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using NSwag;
using NSwag.Generation.Processors.Security;


namespace WebApi.Infrastructure.Swagger
{
    public static class NSwagExtensions
    {
        public static IServiceCollection AddSwaggerConfiguration(this IServiceCollection services)
        {
            services.AddOpenApiDocument(settings =>
            {
                settings.PostProcess = config =>
                {
                    config.Info.Title = "WebUI Open Api";
                };
                // settings.DocumentProcessors.Add(new SecurityDefinitionAppender("oauth",
                //     new OpenApiSecurityScheme
                //     {
                //         Type = OpenApiSecuritySchemeType.OAuth2,
                //         Flow = OpenApiOAuth2Flow.Password,
                //         Flows = new OpenApiOAuthFlows
                //         {
                //             Password = new OpenApiOAuthFlow
                //             {
                //                 TokenUrl = $"/api/loancalc/gui/{ApplicationOAuthConsts.TokenUrl}",
                //                 RefreshUrl = $"/api/loancalc/gui/{ApplicationOAuthConsts.TokenUrl}"
                //             }
                //         }
                //     }));
            });
            return services;
        }

        public static IApplicationBuilder UseSwaggerConfiguration(this IApplicationBuilder app)
        {
            // Add OpenAPI/Swagger middlewares
            app.UseOpenApi(settings =>
            {
                settings.PostProcess = (document, request) =>
                {
                    document.BasePath = request.PathBase;
                };
            });  // Serves the registered OpenAPI/Swagger documents by default on `/swagger/{documentName}/swagger.json`
            app.UseSwaggerUi3(settings =>
            {
                settings.TagsSorter = "alpha";
                settings.OperationsSorter = "alpha";
            });
            return app;
        }
    }
}