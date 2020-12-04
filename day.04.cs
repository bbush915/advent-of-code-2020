using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

internal struct Passport
{
    public string BirthYear { get; set; }
    public string IssueYear { get; set; }
    public string ExpirationYear { get; set; }
    public string Height { get; set; }
    public string HairColor { get; set; }
    public string EyeColor { get; set; }
    public string PassportID { get; set; }
    public string CountryID { get; set; }
}

public static class Program
{
    public static async Task Main(string[] args)
    {
        var passports = await ParseInputAsync(args[0]);

        var part1 = Part1(passports);
        Console.WriteLine($"Part 1: {part1}");

        var part2 = Part2(passports);
        Console.WriteLine($"Part 2: {part2}");
    }

    private async static Task<List<Passport>> ParseInputAsync(string path)
    {
        using var stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
        using var reader = new StreamReader(stream);

        var passports = new List<Passport>();
        var currentPassport = new Passport();

        while (!reader.EndOfStream)
        {
            var line = await reader.ReadLineAsync();

            if (string.IsNullOrEmpty(line))
            {
                passports.Add(currentPassport);
                currentPassport = new Passport();
            }
            else
            {
                var kvps = line.Split(' ');

                foreach (var kvp in kvps)
                {
                    var parts = kvp.Split(':');

                    switch (parts[0])
                    {
                        case "byr":
                        {
                            currentPassport.BirthYear = parts[1];
                            break;
                        }

                        case "iyr":
                        {
                            currentPassport.IssueYear = parts[1];
                            break;
                        }

                        case "eyr":
                        {
                            currentPassport.ExpirationYear = parts[1];
                            break;
                        }

                        case "hgt":
                        {
                            currentPassport.Height = parts[1];
                            break;
                        }

                        case "hcl":
                        {
                            currentPassport.HairColor = parts[1];
                            break;
                        }

                        case "ecl":
                        {
                            currentPassport.EyeColor = parts[1];
                            break;
                        }

                        case "pid":
                        {
                            currentPassport.PassportID = parts[1];
                            break;
                        }

                        case "cid":
                        {
                            currentPassport.CountryID = parts[1];
                            break;
                        }
                    }
                }
            }
        }

        passports.Add(currentPassport);

        return passports;
    }

    private static int Part1(List<Passport> passports)
    {
        var validCount = 0;

        foreach (var passport in passports)
        {
            if (!(
                passport.BirthYear == null ||
                passport.IssueYear == null ||
                passport.ExpirationYear == null ||
                passport.Height == null ||
                passport.HairColor == null ||
                passport.EyeColor == null ||
                passport.PassportID == null
            ))
            {
                validCount++;
            }
        }

        return validCount;
    }

    private static int Part2(List<Passport> passports)
    {
        var validCount = 0;

        foreach (var passport in passports)
        {
            if (
                ValidateBirthYear(passport.BirthYear) &&
                ValidateIssueYear(passport.IssueYear) &&
                ValidateExpirationYear(passport.ExpirationYear) &&
                ValidateHeight(passport.Height) &&
                ValidateHairColor(passport.HairColor) &&
                ValidateEyeColor(passport.EyeColor) &&
                ValidatePassportID(passport.PassportID)
            )
            {
                validCount++;
            }
        }

        return validCount;
    }

    private static bool ValidateBirthYear(string birthYear)
    {
        if (string.IsNullOrEmpty(birthYear))
        {
            return false;
        }

        var regex = new Regex(@"^\d{4}$");
        var match = regex.Match(birthYear);

        if (!match.Success)
        {
            return false;
        }

        var value = Convert.ToInt32(match.Value);

        return value >= 1920 && value <= 2002;
    }

    private static bool ValidateIssueYear(string issueYear)
    {
        if (string.IsNullOrEmpty(issueYear))
        {
            return false;
        }

        var regex = new Regex(@"^\d{4}$");
        var match = regex.Match(issueYear);

        if (!match.Success)
        {
            return false;
        }

        var value = Convert.ToInt32(match.Value);

        return value >= 2010 && value <= 2020;
    }

    private static bool ValidateExpirationYear(string expirationYear)
    {
        if (string.IsNullOrEmpty(expirationYear))
        {
            return false;
        }

        var regex = new Regex(@"^\d{4}$");
        var match = regex.Match(expirationYear);

        if (!match.Success)
        {
            return false;
        }

        var value = Convert.ToInt32(match.Value);

        return value >= 2020 && value <= 2030;
    }

    private static bool ValidateHeight(string height)
    {
        if (string.IsNullOrEmpty(height))
        {
            return false;
        }

        var regex = new Regex(@"^(?<value>\d*)(?<units>(in|cm))$");
        var match = regex.Match(height);

        if (!match.Success)
        {
            return false;
        }

        var value = Convert.ToInt32(match.Groups["value"].Value);
        var units = match.Groups["units"].Value;

        return (units == "in" && (value >= 59 && value <= 76)) || (units == "cm" && (value >= 150 && value <= 193));
    }

    private static bool ValidateHairColor(string hairColor)
    {
        if (string.IsNullOrEmpty(hairColor))
        {
            return false;
        }

        var regex = new Regex(@"^#[0-9a-f]{6}$");
        var match = regex.Match(hairColor);

        return match.Success;
    }

    private static bool ValidateEyeColor(string eyeColor)
    {
        if (string.IsNullOrEmpty(eyeColor))
        {
            return false;
        }

        var regex = new Regex(@"(amb|blu|brn|gry|grn|hzl|oth)$");
        var match = regex.Match(eyeColor);

        return match.Success;
    }

    private static bool ValidatePassportID(string passportID)
    {
        if (string.IsNullOrEmpty(passportID))
        {
            return false;
        }

        var regex = new Regex(@"^\d{9}$");
        var match = regex.Match(passportID);

        return match.Success;
    }
}