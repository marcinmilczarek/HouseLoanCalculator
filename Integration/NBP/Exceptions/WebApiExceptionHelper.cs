using Microsoft.CSharp.RuntimeBinder;
using Newtonsoft.Json;

namespace NBP.Exceptions
{
    public static class WebApiExceptionHelper
    {
        public static void CreateException(string exceptionObject)
        {
            var deserializedException = JsonConvert.DeserializeObject<dynamic>(exceptionObject);

            try
            {
                throw new ApiException(deserializedException);
            }
            catch (RuntimeBinderException)
            {
                throw new ApiException(deserializedException);
            }
        }
    }
}