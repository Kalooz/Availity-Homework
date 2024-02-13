using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace ParenthesesCheckerBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ParenthesesController : ControllerBase
    {
        [HttpPost]
        public ActionResult<bool> CheckParentheses([FromBody] string code)
        {
            Stack<char> stack = new Stack<char>();

            if (code.Length <= 2)
            {
                return false;
            }

            if (code.Length >= 3 && code[0] != '(' && code[code.Length - 1] != ')')
            {
                return false;
            }

            foreach (char c in code)
            {
                if (c == '(')
                {
                    stack.Push(c);
                }
                else if (c == ')')
                {
                    if (stack.Count == 0 || stack.Pop() != '(')
                    {
                        return false;
                    }
                }
            }

            return stack.Count == 0;
        }
    }
}
