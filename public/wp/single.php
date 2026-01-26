<?php get_header(); ?>
<main class="container">
<article class="post">
<h1><?php the_title(); ?></h1>
<p class="meta"><strong><?php the_author(); ?></strong><br><?php the_tags('Keywords: ',', '); ?></p>
<?php the_content(); ?>
<?php if ($pdf = get_post_meta(get_the_ID(),'pdf',true)) : ?>
<div class="buttons">
<a class="btn outline" href="<?php echo esc_url($pdf); ?>">Download PDF</a>
</div>
<?php endif; ?>
</article>
</main>
<?php get_footer(); ?>
