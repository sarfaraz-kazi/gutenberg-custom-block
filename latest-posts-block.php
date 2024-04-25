<?php
/**
 * Plugin Name:       Latest Posts block
 * Description:       Latest Posts block
 * Requires PHP:      7.0
 * Version:           0.1.0
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */


function latest_posts_cgb_block_assets()
{
    // Register block editor script for backend.
    wp_register_script(
        'latest-cpt-posts-dbm-block-js', // Handle.
        plugin_dir_url(__FILE__) . '/build/index.js',
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components'), // Dependencies, defined above.
        null,
        true
    );
    /**
     * Register Gutenberg block on server-side.
     *
     * Register the block on server-side to ensure that the block
     * scripts and styles for both frontend and backend are
     * enqueued when the editor loads.
     *
     * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
     * @since 1.16.0
     */
    register_block_type("fynx-blocks/latest-cpt-posts", array(
            'editor_script' => 'latest-cpt-posts-dbm-block-js',
            'render_callback' => 'dbm_latest_cpt_posts_block'
        )
    );
}

function dbm_latest_cpt_posts_block($attributes): bool|string
{
    if (is_admin()) {
        return '';
    }
    $query_args = array(
        'post_type' => $attributes['SelectedPostType'],
        'posts_per_page' => isset($attributes['posts_per_page']) ? $attributes['posts_per_page'] : 12,
        'orderby' => 'title',
        'order' => isset($attributes['order']) ? $attributes['order'] : 'DESC',
    );
    $popular_post_query = new WP_Query($query_args);
    ob_start();
    if ($popular_post_query->have_posts()) :
        echo '<ul class="is-layout-flow is-flex-container columns-3 wp-block-post-template">';
        while ($popular_post_query->have_posts()) : $popular_post_query->the_post();

            ?>
            <li class="wp-block-post post-25437 soccer type-soccer status-publish hentry soccer-category-tips">
                <article class="is-layout-flow wp-block-group alignwide .card dbm-blog-card has-background-background-color has-background" style="padding: 0;">
                    <figure class="alignwide wp-block-post-featured-image">
                        <a href="<?php the_permalink(); ?>" target="_self">
                            <?php
                            if (has_post_thumbnail()) {
                                echo get_the_post_thumbnail(get_the_ID(), $attributes['imagesize']);
                            }
                            ?>
                        </a>
                    </figure>
                    <div class="is-layout-flow wp-block-group" style="margin-top:0;margin-bottom:0;padding: 20px;">
                        <h3 style="font-style:normal;font-weight:700;" class="has-text-color has-primary-font-color-color dbm-blog-card-title wp-block-post-title has-large-font-size">
                            <a href="<?php the_permalink(); ?>" target="_self"><?php the_title(); ?></a>
                        </h3>
                        <div class="has-text-color has-second-font-color-color wp-block-post-date">
                            <time datetime="<?php echo get_the_date() ?>"><?php echo get_the_date('Y.m.d', get_the_ID()) ?></time>
                        </div>
                    </div>
                </article>
            </li>
            <?php
            echo '</ul>';
        endwhile;
    endif;
    wp_reset_postdata();
    return ob_get_clean();
}

add_action('init', 'latest_posts_cgb_block_assets');
