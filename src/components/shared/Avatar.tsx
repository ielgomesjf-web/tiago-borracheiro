interface Props {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'accent' | 'primary';
}

const sizes = { sm: 'w-10 h-10 text-sm', md: 'w-14 h-14 text-lg', lg: 'w-20 h-20 text-2xl' };
const colors = {
  accent: 'bg-gradient-to-br from-accent to-accent-dark shadow-[0_0_20px_rgba(249,115,22,0.3)]',
  primary: 'bg-gradient-to-br from-primary to-primary-dark shadow-[0_0_20px_rgba(124,58,237,0.3)]',
};

export default function Avatar({ name, size = 'md', color = 'accent' }: Props) {
  const initials = name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return (
    <div className={`${sizes[size]} ${colors[color]} rounded-full flex items-center justify-center font-bold text-white`}>
      {initials}
    </div>
  );
}
