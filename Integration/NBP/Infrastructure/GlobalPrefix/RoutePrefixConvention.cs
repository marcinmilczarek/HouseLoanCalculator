using System.Linq;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.Routing;

namespace NBP.Infrastructure.GlobalPrefix
{
    public class RoutePrefixConvention : IApplicationModelConvention
    {
        private readonly AttributeRouteModel _routePrefix;

        public RoutePrefixConvention(IRouteTemplateProvider route)
        {
            _routePrefix = new AttributeRouteModel(route);
        }

        public void Apply(ApplicationModel application)
        {
            foreach (var selector in application.Controllers.SelectMany(c => c.Selectors))
            {
                if (selector.AttributeRouteModel != null)
                {
                    if (selector.AttributeRouteModel.Template.ToLower().StartsWith("api/") ||
                        selector.AttributeRouteModel.Template.ToLower().StartsWith("/api/"))
                        selector.AttributeRouteModel.Template =
                            $"{_routePrefix.Template}/{selector.AttributeRouteModel.Template.Replace("api/", "")}";
                }
                else
                {
                    selector.AttributeRouteModel = _routePrefix;
                }
            }
        }
    }
}