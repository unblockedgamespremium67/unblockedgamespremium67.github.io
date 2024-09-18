import Link from 'next/link';

import { postPathBySlug } from 'lib/posts';

import FeaturedImage from 'components/FeaturedImage';

import { FaMapPin, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import styles from './PostCardMini.module.scss';

const PostCardMini = ({ post, options = {} }) => {
  const { title, slug, date, author, categories, featuredImage, isSticky = false } = post;
  const { excludeMetadata = [] } = options;

  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  let postCardStyle = styles.postCard;

  return (
    <div className={postCardStyle}>
      <div className={styles.postCardInner}>
        {isSticky && <FaMapPin aria-label="Sticky Post" />}
        {featuredImage && (
          <FeaturedImage
            {...featuredImage}
            src={featuredImage.sourceUrl}
            dangerouslySetInnerHTML={featuredImage.caption}
            width="230px"
            height="160px"
            srcSet=""
          />
        )}
        <Link href={postPathBySlug(slug)}>
          <h3
            className={styles.postCardTitle}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default PostCardMini;
