import os
from PIL import Image, ImageOps

photos_dirs = [
    r"c:\Users\ARYAN SINGH JADAUN\Desktop\Cluster 2\love-app\public\photos",
    r"c:\Users\ARYAN SINGH JADAUN\Desktop\Cluster 2\photos"
]

MAX_SIZE = (1200, 1200)
QUALITY = 78

total_before = 0
total_after = 0
count = 0

for target_dir in photos_dirs:
    if not os.path.exists(target_dir):
        continue
    print(f"Compressing images in: {target_dir}")
    for fname in os.listdir(target_dir):
        ext = os.path.splitext(fname)[1].lower()
        if ext in ['.jpg', '.jpeg', '.png', '.webp']:
            fpath = os.path.join(target_dir, fname)
            try:
                size_before = os.path.getsize(fpath)
                total_before += size_before

                with Image.open(fpath) as img:
                    img = ImageOps.exif_transpose(img)
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                    img.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
                    img.save(fpath, 'JPEG', quality=QUALITY, optimize=True)

                size_after = os.path.getsize(fpath)
                total_after += size_after
                count += 1
            except Exception as e:
                print(f"Error compressing {fname}: {e}")

print(f"Compressed {count} photos!")
print(f"Total size before: {total_before / (1024*1024):.2f} MB")
print(f"Total size after:  {total_after / (1024*1024):.2f} MB")
