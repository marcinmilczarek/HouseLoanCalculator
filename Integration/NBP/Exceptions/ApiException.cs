using System;
using Newtonsoft.Json;

namespace NBP.Exceptions
{
    public class ApiException: Exception
    {
        public override string StackTrace { get; }
        public override string Message { get; }

        public ApiException(dynamic deserializedJson) : base("")
        {
            Message = deserializedJson.ExceptionMessage == null
                ? deserializedJson.Message.Value
                : deserializedJson.ExceptionMessage.Value;
            StackTrace = deserializedJson.StackTrace == null
                ? deserializedJson.MessageDetail.Value
                : deserializedJson.StackTrace.Value;
        }

        public ApiException(string jsonException) : base("")
        {
            var deserializedException = JsonConvert.DeserializeObject<dynamic>(jsonException);

            Message = deserializedException.ExceptionMessage == null
                ? deserializedException.Message.Value
                : deserializedException.ExceptionMessage.Value;
            StackTrace = deserializedException.StackTrace == null
                ? deserializedException.MessageDetail.Value
                : deserializedException.StackTrace.Value;

        }
    }
}