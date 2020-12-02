using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

public static class Program
{
    public static async Task Main(string[] args)
    {
        using var stream = new FileStream(args[0], FileMode.Open, FileAccess.Read, FileShare.Read);
        using var reader = new StreamReader(stream);

        var entries = new List<int>();

        while (!reader.EndOfStream)
        {
            var line = await reader.ReadLineAsync();
            var entry = Convert.ToInt32(line);

            entries.Add(entry);
        }

        var part1 = Part1(entries);
        Console.WriteLine($"Part 1: {part1}");

        var part2 = Part2(entries);
        Console.WriteLine($"Part 2: {part2}");
    }

    private static int Part1(List<int> entries)
    {
        for (var i = 0; i < entries.Count; i++)
        {
            for (var j = i + 1; j < entries.Count; j++)
            {
                var x = entries[i];
                var y = entries[j];

                if (x + y == 2020)
                {
                    return x * y;
                }
            }
        }

        return -1;
    }

    private static int Part2(List<int> entries)
    {
        for (var i = 0; i < entries.Count; i++)
        {
            for (var j = i + 1; j < entries.Count; j++)
            {
                for (var k = j + 1; k < entries.Count; k++)
                {
                    var x = entries[i];
                    var y = entries[j];
                    var z = entries[k];

                    if (x + y + z == 2020)
                    {
                        return x * y * z;
                    }
                }
            }
        }

        return -1;
    }
}
