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

        var map = new List<string>();

        while (!reader.EndOfStream)
        {
            var line = await reader.ReadLineAsync();
            map.Add(line);
        }

        var part1 = Part1(map, 3, 1);
        Console.WriteLine($"Part 1: {part1}");

        var part2 = Part2(map);
        Console.WriteLine($"Part 2: {part2}");
    }

    private static int Part1(List<string> map, int dx, int dy)
    {
        var x = 0;
        var y = 0;

        var treeCount = 0;

        while (y < map.Count)
        {
            if (map[y][x] == '#')
            {
                treeCount++;
            }

            x =  (x + dx) % map[y].Length;
            y += dy;
        }

        return treeCount;
    }

    private static int Part2(List<string> map)
    {
        return Part1(map, 1, 1) * Part1(map, 3, 1) * Part1(map, 5, 1) * Part1(map, 7, 1) * Part1(map, 1, 2); 
    }
}
