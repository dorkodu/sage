<?php

declare(strict_types=1);

use const DIRECTORY_SEPARATOR;
use function array_keys;
use function array_map;
use function array_values;
use function count;
use function explode;
use function implode;
use function min;
use function preg_replace;
use function preg_replace_callback;
use function sprintf;
use function strtr;
use function trim;

/**
 * Color - A util class for styling text on Terminal environment using ANSI codes.
 * 
 * @author     Doruk Eray (@dorkodu) <doruk@dorkodu.com>
 * @copyright  (c) 2021, Doruk Eray
 * @link       <https://github.com/dorukdorkodu/dorkodu-utils>
 * @license    The MIT License (MIT)
 */
final class Color
{
  /**
   * @var array<string,string>
   */
  private const WHITESPACE_MAP = [
    ' '  => '·',
    "\t" => '→',
  ];

  /**
   * @var array<string,string>
   */
  private const WHITESPACE_EOL_MAP = [
    ' '  => '·',
    "\t" => '→',
    "\n" => '↵',
    "\r" => '⟵',
  ];

  /**
   * @var array<string,string>
   */
  private static $ansiCodes = [
    'reset'      => '0',
    'bold'       => '1',
    'dim'        => '2',
    'dim-reset'  => '22',
    'underlined' => '4',
    'reversed'   => '7',
    'fg-default' => '39',
    'fg-black'   => '30',
    'fg-red'     => '31',
    'fg-green'   => '32',
    'fg-yellow'  => '33',
    'fg-blue'    => '34',
    'fg-magenta' => '35',
    'fg-cyan'    => '36',
    'fg-white'   => '37',
    'bg-default' => '49',
    'bg-black'   => '40',
    'bg-red'     => '41',
    'bg-green'   => '42',
    'bg-yellow'  => '43',
    'bg-blue'    => '44',
    'bg-magenta' => '45',
    'bg-cyan'    => '46',
    'bg-white'   => '47',
  ];

  /**
   * List the styles seperated with a ',' (comma) to be applied to given string
   *
   * @param string $color
   * @param string $text
   * @return string
   */
  public static function colorize(string $color, string $text): string
  {
    if (trim($text) === '') {
      return $text;
    }

    $codes  = array_map('\trim', explode(',', $color));
    $styles = [];

    foreach ($codes as $code) {
      if (isset(self::$ansiCodes[$code])) {
        $styles[] = self::$ansiCodes[$code] ?? '';
      }
    }

    if (empty($styles)) {
      return $text;
    }

    return self::optimizeColor(sprintf("\x1b[%sm", implode(';', $styles)) . $text . "\x1b[0m");
  }

  public static function colorizePath(string $path, ?string $prevPath = null, bool $colorizeFilename = false): string
  {
    if ($prevPath === null) {
      $prevPath = '';
    }

    $path     = explode(DIRECTORY_SEPARATOR, $path);
    $prevPath = explode(DIRECTORY_SEPARATOR, $prevPath);

    for ($i = 0; $i < min(count($path), count($prevPath)); $i++) {
      if ($path[$i] == $prevPath[$i]) {
        $path[$i] = self::dim($path[$i]);
      }
    }

    if ($colorizeFilename) {
      $last        = count($path) - 1;
      $path[$last] = preg_replace_callback(
        '/([\-_\.]+|phpt$)/',
        static function ($matches) {
          return self::dim($matches[0]);
        },
        $path[$last]
      );
    }

    return self::optimizeColor(implode(self::dim(DIRECTORY_SEPARATOR), $path));
  }

  public static function dim(string $text): string
  {
    if (trim($text) === '') {
      return $text;
    }

    return "\e[2m{$text}\e[22m";
  }

  public static function visualizeWhitespace(string $text, bool $visualizeEOL = false): string
  {
    $replaceMap = $visualizeEOL ? self::WHITESPACE_EOL_MAP : self::WHITESPACE_MAP;

    return preg_replace_callback('/\s+/', static function ($matches) use ($replaceMap) {
      return self::dim(strtr($matches[0], $replaceMap));
    }, $text);
  }

  private static function optimizeColor(string $text): string
  {
    $patterns = [
      "/\e\\[22m\e\\[2m/"                   => '',
      "/\e\\[([^m]*)m\e\\[([1-9][0-9;]*)m/" => "\e[$1;$2m",
      "/(\e\\[[^m]*m)+(\e\\[0m)/"           => '$2',
    ];

    return preg_replace(array_keys($patterns), array_values($patterns), $text);
  }
}
