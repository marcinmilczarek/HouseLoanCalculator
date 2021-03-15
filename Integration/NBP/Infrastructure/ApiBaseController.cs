using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using NBP.Exceptions;
using Newtonsoft.Json;

namespace NBP.Infrastructure
{
    public abstract class ApiBaseController
    { 
        private readonly HttpClient _httpClient;
        public HttpClient HttpClient
        {
            protected get
            {
                return _httpClient;
            }
            init
            {
                _httpClient = value ?? throw new ArgumentNullException(nameof(HttpClient));
            }
        }
        
        private JsonSerializerSettings _customJsonSerializerSettings;
        public JsonSerializerSettings CustomJsonSerializerSettings
        {
            private get
            {
                return _customJsonSerializerSettings;
            }
            set
            {
                _customJsonSerializerSettings = value ?? throw new ArgumentNullException(nameof(CustomJsonSerializerSettings));
            }
        }


        protected ApiBaseController(HttpClient httpClient)
        {
            HttpClient = httpClient;
        }

        protected async Task<TResultType> Get<TResultType>(string url)
        {
            return await MakeRequest<TResultType>(url, HttpMethod.Get);
        }
        
        private async Task<TResultType> MakeRequest<TResultType>(string url, HttpMethod method, object body = null)
        {
            if (string.IsNullOrEmpty(url))
                throw new ArgumentNullException(nameof(url));

            var request = new HttpRequestMessage(method,  url);
            
            if (body != null)
                request.Content = new StringContent(JsonConvert.SerializeObject(body, null, CustomJsonSerializerSettings), Encoding.UTF8, "application/json");

            var taskToAwait = HttpClient.SendAsync(request, HttpCompletionOption.ResponseContentRead);

            var result = await taskToAwait;

            if (!result.IsSuccessStatusCode)
            {
                WebApiExceptionHelper.CreateException(await result.Content.ReadAsStringAsync());

                throw new Exception(result.ReasonPhrase);
            }
            
            var stringResult = await result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<TResultType>(stringResult, CustomJsonSerializerSettings);
        }
    }
}