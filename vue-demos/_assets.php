<?php
  return [
    'vendor' => '<%= htmlWebpackPlugin.files.chunks._vendor.entry %>',

    'app_css' => '<%= htmlWebpackPlugin.files.chunks.app.css %>',
    'app_js' => '<%= htmlWebpackPlugin.files.chunks.app.entry %>'
  ];
