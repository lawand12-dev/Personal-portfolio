type PageTitleProps = {
  children: string
  className?: string
  id: string
}

function PageTitle({
  children,
  className = 'portfolio-page-title',
  id,
}: PageTitleProps) {
  return (
    <h1 className={className} id={id}>
      {children}
    </h1>
  )
}

export default PageTitle
