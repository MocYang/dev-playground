<?php
return [
  'vendors_css' => '<%= htmlWebpackPlugin.files.chunks.vendors.css %>',
  'vendors_js' => '<%= htmlWebpackPlugin.files.chunks.vendors.entry %>',

  'index_css' => '<%= htmlWebpackPlugin.files.chunks.index.css %>',
  'index_js' => '<%= htmlWebpackPlugin.files.chunks.index.entry %>'
];
