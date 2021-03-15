using System;
using System.ComponentModel;

namespace BusinessLogic.Extensions
{
    public static class EnumExtensions
    {
        public static string GetDescription(this Enum value)
        {
            var enumType = value.GetType();

            var field = enumType.GetField(value.ToString());

            var attributes = field.GetCustomAttributes(typeof (DescriptionAttribute), false);

            return attributes.Length == 0 ? value.ToString() : ((DescriptionAttribute) attributes[0]).Description;
        }
    }
}