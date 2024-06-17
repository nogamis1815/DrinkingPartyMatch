# ベースイメージとしてPHP-FPMを使用
FROM php:8.2-fpm

# 必要な依存関係をインストール
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath zip

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# PHP-FPMのカスタム設定をコピー
COPY php-fpm.conf /usr/local/etc/php-fpm.conf
COPY www.conf /usr/local/etc/php-fpm.d/www.conf

# ログディレクトリとログファイルの作成と権限設定
RUN mkdir -p /var/log/php-fpm && \
    touch /var/log/php-fpm/slow.log /var/log/php-fpm/error.log /var/log/php-fpm/www-error.log && \
    chown -R www-data:www-data /var/log/php-fpm && \
    mkdir -p /run/php && \
    chown -R www-data:www-data /run/php

# アプリケーションコードをコピー
COPY . /var/www

WORKDIR /var/www

# 権限の設定
RUN chown -R www-data:www-data /var/www && \
    chmod -R 755 /var/www

# 実行ユーザーの変更
USER www-data

# ポート9000を公開してphp-fpmサーバーを起動
EXPOSE 9000
CMD ["php-fpm"]
