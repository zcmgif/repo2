using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Flowers.Common
{
    public class Validator
    {
        /// <summary>
        /// 是否位正确的日期时间格式
        /// </summary>
        /// <returns>true</returns>
        public static bool IsDataformat(string str)
        {
            if (str == null) return false;
            if (str == "") return false;

            try
            {
                System.Convert.ToDateTime(str.Trim());
                return true;
            }
            catch
            {
                return false;
            }


        }
        /// <summary>
        /// 判断对象是否为Int32类型的数字
        /// </summary>
        /// <param name="Expression"></param>
        /// <returns></returns>
        public static bool IsNumeric(object expression)
        {
            if (expression != null)
                return IsNumeric(expression.ToString());

            return false;

        }

        /// <summary>
        /// 判断对象是否为Int32类型的数字
        /// </summary>
        /// <param name="Expression"></param>
        /// <returns></returns>
        public static bool IsNumeric(string expression)
        {
            if (expression != null)
            {
                string str = expression;
                if (str.Length > 0 && str.Length <= 11 && Regex.IsMatch(str, @"^[-]?[0-9]*[.]?[0-9]*$"))
                {
                    if ((str.Length < 10) || (str.Length == 10 && str[0] == '1') || (str.Length == 11 && str[0] == '-' && str[1] == '1'))
                        return true;
                }
            }
            return false;
        }

        /// <summary>
        /// 是否为Double类型
        /// </summary>
        /// <param name="expression"></param>
        /// <returns></returns>
        public static bool IsDouble(object expression)
        {
            if (expression != null)
                return Regex.IsMatch(expression.ToString(), @"^([0-9])[0-9]*(\.\w*)?$");

            return false;
        }

        /// <summary>
        /// 判断给定的字符串数组(strNumber)中的数据是不是都为数值型
        /// </summary>
        /// <param name="strNumber">要确认的字符串数组</param>
        /// <returns>是则返加true 不是则返回 false</returns>
        public static bool IsNumericArray(string[] strNumber)
        {
            if (strNumber == null)
                return false;

            if (strNumber.Length < 1)
                return false;

            foreach (string id in strNumber)
            {
                if (!IsNumeric(id))
                    return false;
            }
            return true;
        }

        /// <summary>
        /// （正整数 >0）
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public static bool IsIntPlus(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^[0-9]*[1-9][0-9]*$"))
                return true;
            return false;
        }
        /// <summary>
        /// （正整数 包括 0）
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public static bool IsInteger(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^[0-9]+$"))
                return true;
            return false;
        }
        /// <summary>
        /// （正整数 包括 0）
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public static bool IsIntPlusAndZero(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^[0-9]+$"))
                return true;
            return false;
        }
        /// <summary>
        /// 匹配负整数,不包括0
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public static bool IsIntNegative(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^-[0-9]*[1-9][0-9]*$"))
                return true;
            return false;
        }
        /// <summary>
        /// 匹配整数,正数和负数，不包括0
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public static bool IsIntAllNotZero(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^-?[1-9]\d*$"))
                return true;
            return false;
        }
        /// <summary>
        /// 匹配整数,正数和负数，包括0
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public static bool IsIntAll(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^-?\d+$"))
                return true;
            return false;
        }
        /// <summary>
        ///（负整数 包括 0）
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public static bool IsIntNegativeAndZero(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^-[1-9]d*|0$"))
                return true;
            return false;
        }


        /// <summary>
        /// 非负浮点数（正浮点数 + 0）  
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public static bool IsPosNumber(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^\d+(\.\d+)?$"))
                return true;
            return false;
        }
        /// <summary>
        /// 匹配正浮点数>0
        /// </summary>
        public static bool IsFloatPlus(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$"))
                return true;
            return false;
        }
        /// <summary>
        /// 非负浮点数（正浮点数 + 0）  
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public static bool IsFloatPlusAndZero(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^\d+(\.\d+)?$"))
                return true;
            return false;
        }
        /// <summary>
        /// 匹配负浮点数<0
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public static bool IsFloatNegative(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$"))
                return true;
            return false;
        }
        /// <summary>
        /// 非正浮点数（负浮点数 + 0）  
        /// </summary>
        /// <param name="strIn"></param>
        /// <returns></returns>
        public static bool IsFloatNegativeAndZero(string strIn)
        {
            if (Regex.IsMatch(strIn, @"^((-\d+(\.\d+)?)|(0+(\.0+)?))$"))
                return true;
            return false;
        }
    }
}
