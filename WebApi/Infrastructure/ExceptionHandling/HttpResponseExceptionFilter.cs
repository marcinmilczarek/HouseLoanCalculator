using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApi.Infrastructure.ExceptionHandling
{
    public class HttpResponseExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            context.Result = new ObjectResult(new ExceptionDetails
            {
                ExceptionMessage = context.Exception.Message,
                StackTrace = context.Exception.StackTrace,
                Message = "An error has occurred.",
                ExceptionType = context.Exception.GetType().FullName
            })
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
            context.ExceptionHandled = true;
        }
    }
}