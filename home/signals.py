from io import BytesIO
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.files.images import ImageFile
from PIL import Image


def process_files(fieldnames):
	"""optimize files before storing"""
	def decorator(model):
		"""checks if model has the specified attr or raises AssertionError"""
		for fieldname in fieldnames:
			assert hasattr(model, fieldname), f'Model has no field {fieldname!r}'

		@receiver(pre_save, sender=model, weak=False)
		def process_img(sender, instance, *args, raw=False, **kwargs):
			"""convert image to webp format and compress"""
			if not raw:
				for fieldname in fieldnames:
					file = getattr(instance, fieldname, None)
					ext = ''
					if file:
						file_name_ext = file.name.split('.')
						ext = file_name_ext.pop()
						file_name = ''.join(file_name_ext)
					if ext.lower() != 'webp':
						try:
							# print(file.path, file.url, file.size, file.name)
							img = Image.open(file)
							img.verify()
							img = Image.open(file)
							rgb_img = img.convert('RGB')
							image_io = BytesIO()
							rgb_img.save(image_io, format='webp', quality=30, optimize=True)
							# instance = ImageFile(image_io, name=f'{file_name}.webp')
							img_file = ImageFile(image_io, name=f'{file_name}.webp')
							setattr(instance, fieldname, img_file)
							print('Processing complete!', instance)
						except Exception as e:
							print(e)
		return model
	return decorator