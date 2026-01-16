<?php
add_theme_support('title-tag');
add_theme_support('post-thumbnails');

register_nav_menus([
  'primary' => 'Primary Menu',
]);

function ejournal_assets() {
  wp_enqueue_style(
    'ejournal-main',
    get_template_directory_uri() . '/assets/css/main.css',
    [],
    '1.0'
  );
}
add_action('wp_enqueue_scripts', 'ejournal_assets');
