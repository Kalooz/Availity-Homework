using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Homework.Server;
using Microsoft.AspNetCore.Mvc;

namespace ParenthesesCheckerBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EDIController : ControllerBase
    {
        [HttpPost("processcsvfile")]
        public IActionResult ProcessCSVFile()
        {
            var httpRequest = HttpContext.Request;
            if (httpRequest.Form.Files.Count == 0)
            {
                return BadRequest("No file uploaded");
            }

            var file = httpRequest.Form.Files[0];
            if (file == null || file.Length == 0)
            {
                return BadRequest("Invalid file");
            }

            List<EDI> records = new List<EDI>();

            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    string[] parts = line.Split(',');
                    records.Add(new EDI
                    {
                        UserId = parts[0],
                        FirstName = parts[1],
                        LastName = parts[2],
                        Version = parts[3],
                        InsuranceCompany = parts[4]
                    });
                }
            }

            var groups = records.GroupBy(r => r.InsuranceCompany);

            List<string> filePaths = new List<string>(); // List to store file paths

            foreach (var group in groups)
            {
                var sortedRecords = group.OrderByDescending(r => r.Version)
                                         .ThenBy(r => r.LastName)
                                         .ThenBy(r => r.FirstName);

                var uniqueRecords = sortedRecords.GroupBy(r => r.UserId)
                                                  .Select(g => g.First());

                string outputFileName = $"{group.Key}_Enrollees.csv";
                string outputPath = Path.Combine("insurances", outputFileName); // Relative to wwwroot

                // Replace backslashes with forward slashes
                outputPath = outputPath.Replace('\\', '/');

                // Add the file path to the list
                filePaths.Add(outputPath);

                // Full path where the file will be saved
                string fullOutputPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", outputPath);

                using (var writer = new StreamWriter(fullOutputPath))
                {
                    foreach (var record in uniqueRecords)
                    {
                        writer.WriteLine($"{record.UserId},{record.FirstName},{record.LastName},{record.Version},{record.InsuranceCompany}");
                    }
                }
            }

            return Ok(new { Message = "Files processed successfully", FilePaths = filePaths });
        }

        // EDI class definition goes here
    }
}
