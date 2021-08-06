<?php

use Exception;

class SageWhitepaper
{
  /**
   * Generates the paper, and publishes it
   *
   * @return void
   */
  public static function publish(string $path)
  {
    $content = self::generatePaper();
    self::savePaper($path, $content);
  }

  /**
   * Returns the markdown contents of the Sage Whitepaper.
   *
   * @return string
   */
  public static function markdown()
  {
    return self::generatePaper();
  }

  /**
   * Lists all sections' markdown files.
   *
   * @return array
   */
  private static function listAllSections()
  {
    return glob('../[0-9] -- *.md');
  }

  private static function getIndex()
  {
    $indexPath = "../Index.md";

    # get Index contents if file exists
    if (is_file($indexPath)) {
      return file_get_contents($indexPath);
    }

    throw new Exception("The Sage Whitepaper's index file couldn't be found", 1);
  }

  /**
   * @return string
   */
  private static function generatePaper()
  {
    $contents = "";

    $index = self::getIndex();

    $contents .= $index;

    $markdownList = self::listAllSections();

    foreach ($markdownList as $markdownFile) {
      $section = file_get_contents($markdownFile);
      $contents .= "\n" . $section;
    }

    return $contents;
  }

  private static function savePaper(string $path, string $contents)
  {
    $contents .= "\n";
    file_put_contents($path, $contents);
  }
}
