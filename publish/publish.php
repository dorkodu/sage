<?php

error_reporting(E_ERROR);

require "SageWhitepaper.php";
require "Color.php";


function publishSageWorkingDraft()
{
  consoleLog(
    Color::colorize("bold", " .:: Sage Whitepaper Publisher ::. ")
  );

  SageWhitepaper::publish("../paper/releases/~draft.md");

  $successPublished = is_file("../paper/releases/~draft.md");

  if ($successPublished) {
    consoleLog(
      Color::colorize("bold, fg-green", "✔")
        . " Done."
    );
  } else {
    consoleLog(
      Color::colorize("bold, fg-red", "⨯")
        . " Something went wrong :("
    );
  }
}

function consoleLog($message)
{
  print $message . PHP_EOL;
}

publishSageWorkingDraft();
