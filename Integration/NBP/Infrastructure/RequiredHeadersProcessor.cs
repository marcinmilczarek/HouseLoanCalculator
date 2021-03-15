using NJsonSchema;
using NSwag;
using NSwag.Generation.Processors;
using NSwag.Generation.Processors.Contexts;

namespace NBP.Infrastructure
{
    public class RequiredHeadersProcessor : IOperationProcessor
    {
        public bool Process(OperationProcessorContext context)
        {
            context.OperationDescription.Operation.Parameters.Add(
                new OpenApiParameter
                {
                    Name = "",
                    Kind = OpenApiParameterKind.Header,
                    Schema = new JsonSchema { Type = JsonObjectType.String },
                    IsRequired = true
                });

            return true;
        }
    }
}